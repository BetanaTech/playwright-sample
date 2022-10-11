import { test, expect } from '@playwright/test';

test.describe('ログイン', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:53000/ja/login");
  });

  test.describe('ページのタイトル', () => {
    test('「ログイン」が表示されている', async ({ page }) => {
      await expect(page.locator('h2')).toHaveCount(1);
      await expect(page.locator('h2')).toHaveText('ログイン');
    });
  })

  test.describe('メールアドレスの入力欄', () => {
    test('ラベル「メールアドレス」が表示されている', async ({ page }) => {
      await expect(page.locator('label[for="email"]')).toHaveCount(1);
      await expect(page.locator('label[for="email"]')).toHaveText(/メールアドレス/);
    });
  })
});