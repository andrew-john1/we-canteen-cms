import { WeCanteenScssPage } from './app.po';

describe('we-canteen-scss App', function() {
  let page: WeCanteenScssPage;

  beforeEach(() => {
    page = new WeCanteenScssPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
