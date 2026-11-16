import { test, expect, visit, expectNoHorizontalOverflow } from './fixtures';

test('home renders local artwork and navigates through both hero actions', async ({
  page,
}) => {
  await visit(page, '/');
  await expect(
    page.getByRole('heading', { name: 'Best Toronto Zappa Tribute' }),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Band logo', exact: true }),
  ).toHaveCount(0);
  for (const name of [/December 4 Bovine Sex Club poster/]) {
    const image = page.getByRole('img', { name });
    await expect(image).toBeVisible();
    await expect(image).toHaveJSProperty('complete', true);
    expect(
      await image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
  }
  await expectNoHorizontalOverflow(page);
  await page.getByRole('link', { name: 'See Shows', exact: true }).click();
  await expect(page).toHaveURL('/shows');
  await expect(
    page.getByRole('heading', { name: 'Shows', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: 'The Cosmik Muffin Experience', exact: true })
    .click();
  await page.getByRole('link', { name: 'Watch Videos', exact: true }).click();
  await expect(page).toHaveURL('/watch');
  await expect(
    page.getByRole('heading', { name: 'Watch', exact: true }),
  ).toBeVisible();
});

test('navigation works at the configured viewport size', async ({
  page,
  isMobile,
}) => {
  await visit(page, '/');
  const nav = page.getByRole('navigation');
  const toggle = nav.getByRole('button', { name: 'Toggle menu' });

  if (isMobile) {
    await expect(toggle).toBeVisible();
    // Hydration is awaited by visit(), so this exercises the React handler.
    await toggle.click();
    await expect(
      nav.getByRole('link', { name: 'Contact', exact: true }).last(),
    ).toBeVisible();
    await toggle.click();
    await expect(
      nav.getByRole('link', { name: 'Contact', exact: true }).last(),
    ).not.toBeInViewport();
  } else {
    await expect(toggle).toBeHidden();
  }

  for (const [label, heading, path] of [
    ['Shows', 'Shows', '/shows'],
    ['Watch', 'Watch', '/watch'],
    ['Contact', 'Get in Touch', '/contact'],
  ]) {
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    if (isMobile) await toggle.click();
    await nav
      .getByRole('link', { name: label, exact: true })
      .filter({ visible: true })
      .click();
    await expect(page).toHaveURL(path);
    await expect(
      page.getByRole('heading', { name: heading, exact: true }),
    ).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test('December 4 Bovine show displays event details and opens its ticket link', async ({
  page,
}) => {
  // Keep the ticket interaction test stable after the event date passes.
  await page.clock.setFixedTime(new Date('2026-11-16T12:00:00-05:00'));
  await visit(page, '/shows');
  const show = page.getByRole('listitem').filter({
    has: page.getByText('Fri, Dec 4, 2026', { exact: true }),
  });
  await expect(
    show.getByRole('heading', { name: 'Bovine Sex Club', exact: true }),
  ).toBeVisible();
  await expect(
    show.getByText('542 Queen St W, Toronto', { exact: true }),
  ).toBeVisible();
  for (const band of [
    'Hotter Than Heck (KISS)',
    'Cosmik Muffin Experience (Frank Zappa)',
    'Dad Sabbath (Black Sabbath)',
  ]) {
    await expect(show.getByText(band, { exact: true })).toBeVisible();
  }
  await expect(
    show.getByText('Music at 9 PM · 19+ · Advance tickets $15 + fees', {
      exact: true,
    }),
  ).toBeVisible();
  const poster = show.getByRole('img', {
    name: /Tess's December 4 Bovine Sex Club poster/,
  });
  await expect(poster).toBeVisible();
  await expect(poster).toHaveJSProperty('complete', true);
  expect(
    await poster.evaluate((image: HTMLImageElement) => image.naturalWidth),
  ).toBeGreaterThan(0);
  const posterLink = show.getByRole('link', {
    name: 'View full-size show poster (opens in a new tab)',
  });
  const posterPopupPromise = page.waitForEvent('popup');
  await posterLink.click();
  const posterPopup = await posterPopupPromise;
  await posterPopup.waitForLoadState('domcontentloaded');
  expect(new URL(posterPopup.url()).pathname).toBe(
    '/images/bovine-dec-4-2026-poster.jpg',
  );
  await expect(posterPopup.locator('img')).toHaveJSProperty('complete', true);
  await posterPopup.close();
  const ticketUrl =
    'https://tixert.com/events/live-tributes-to-black-sabbath-frank-zappa-kiss';
  const tickets = show.getByRole('link', { name: 'Tickets', exact: true });
  await expect(tickets).toHaveAttribute('href', ticketUrl);
  await expect(tickets).toHaveAttribute('rel', /noopener/);
  const popupPromise = page.waitForEvent('popup');
  await tickets.click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');
  expect(popup.url()).toBe(ticketUrl);
  await popup.close();
  await expectNoHorizontalOverflow(page);
});

test('watch exposes titled YouTube embeds without contacting YouTube', async ({
  page,
}) => {
  await visit(page, '/watch');
  const embeds = page.locator('main iframe');
  expect(await embeds.count()).toBeGreaterThan(0);
  for (const embed of await embeds.all()) {
    await expect(embed).toHaveAttribute('title', /\S+/);
    await expect(embed).toHaveAttribute(
      'src',
      /^https:\/\/www\.youtube\.com\/embed\/.+/,
    );
  }
  await expectNoHorizontalOverflow(page);
});

test('gallery opens, advances, reverses and closes the lightbox', async ({
  page,
}, testInfo) => {
  await visit(page, '/gallery');
  await expect(
    page.getByRole('heading', { name: 'Gallery', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('main').getByRole('button')).toHaveCount(6);
  await page.getByRole('button', { name: 'Live show 1', exact: true }).click();

  const dialog = page.getByRole('dialog');
  const previous = dialog.getByRole('button', { name: 'Previous image' });
  const next = dialog.getByRole('button', { name: 'Next image' });
  await expect(dialog).toBeVisible();
  await expect(previous).toBeDisabled();
  await next.click();
  await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'Live show 2');
  await previous.click();
  await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'Live show 1');
  for (let index = 0; index < 5; index += 1) await next.click();
  await expect(next).toBeDisabled();
  await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'Live show 6');
  const screenshot = testInfo.outputPath('lightbox.png');
  await page.screenshot({ path: screenshot, animations: 'disabled' });
  await testInfo.attach('lightbox', {
    path: screenshot,
    contentType: 'image/png',
  });
  await dialog.getByRole('button', { name: 'Close lightbox' }).click();
  await expect(dialog).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});

test('contact opens the actual Instagram destination in a separate tab', async ({
  page,
}) => {
  await visit(page, '/contact');
  const contact = page.getByRole('link', { name: 'Message us on Instagram' });
  await expect(contact).toHaveAttribute(
    'href',
    'https://www.instagram.com/cosmikmuffinexperience/',
  );
  await expect(contact).toHaveAttribute('rel', /noopener/);
  const popupPromise = page.waitForEvent('popup');
  await contact.click();
  const popup = await popupPromise;
  await popup.waitForLoadState('domcontentloaded');
  expect(popup.url()).toBe('https://www.instagram.com/cosmikmuffinexperience/');
  await popup.close();
  await expectNoHorizontalOverflow(page);
});

test('unknown routes show the custom 404 and return home', async ({ page }) => {
  await visit(page, '/this-page-does-not-exist', 404);
  await expect(
    page.getByRole('heading', { name: '404', exact: true }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to Home' }).click();
  await expect(page).toHaveURL('/');
  await expect(
    page.getByRole('heading', { name: 'Best Toronto Zappa Tribute' }),
  ).toBeVisible();
});
