import { test, expect } from '@playwright/test';

test.describe('会員登録', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:53000/ja/signup");
  });

  test.describe('ページのタイトル', () => {
    test('「会員登録」が表示されている', async ({ page }) => {
      await expect(page.locator('h2')).toHaveCount(1);
      await expect(page.locator('h2')).toHaveText('会員登録');
    });
  })

  test.describe('メールアドレスの入力欄', () => {
    test('ラベル「メールアドレス」が表示されている', async ({ page }) => {
      await expect(page.locator('label[for="email"]')).toHaveCount(1);
      await expect(page.locator('label[for="email"]')).toHaveText(/メールアドレス/);
    });
    test('ラベル「必須」が表示されている', async ({ page }) => {
      await expect(page.locator('label[for="email"]')).toHaveCount(1);
      await expect(page.locator('label[for="email"]')).toHaveText(/必須/);
    });
  })

  test.describe('入力', () => {
    test('正常系', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('test@mail.com');
      await page.getByLabel('パスワード 必須').fill('password');
      await page.getByLabel('パスワード（確認） 必須').fill('password');
      await page.getByLabel('氏名').fill('日立　太郎');
      await page.getByLabel('一般会員').check();
      await page.getByLabel('住所').fill('東京都　＊＊＊');
      await page.getByLabel('電話番号').fill('09012345678');
      await page.getByLabel('性別').selectOption({ label: '男性' });
      await page.getByLabel('生年月日').fill('2020-10-01');
      await page.getByLabel('お知らせを受け取る').check();

      await page.locator('button:has-text("登録")').click();
    
      await expect(page).toHaveScreenshot({fullPage: true});
    });

    test.describe('異常系', () => {
      test('電話番号が半角数字11桁以外の場合に、エラーメッセージ「指定されている形式で入力してください。」が表示される', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('test@mail.com');
      await page.getByLabel('パスワード 必須').fill('password');
      await page.getByLabel('パスワード（確認） 必須').fill('password');
      await page.getByLabel('氏名').fill('日立　太郎');
      await page.getByLabel('一般会員').check();
      await page.getByLabel('住所').fill('東京都　＊＊＊');
      await page.getByLabel('電話番号').fill('090123456789');
      await page.getByLabel('性別').selectOption({ label: '男性' });
      await page.getByLabel('生年月日').fill('2020-10-01');
      await page.getByLabel('お知らせを受け取る').check();

      await page.locator('button:has-text("登録")').click();

      await expect(page.locator('div:has(> label[for="tel"])')).toHaveText(/指定されている形式で入力してください。/);

      await expect(page).toHaveScreenshot({fullPage: true});
      });
    })
  })
});