import { $, browser,  } from 'protractor';

describe('Angular Buch', () => {

  beforeAll(() => browser.waitForAngularEnabled(false));


  it('should be called Angular', () => {

     browser.get('https://www.dpunkt.de/buecher/13231.html');
     const text = $('.detail_title').getText();

     browser.driver.manage().window().setSize(800, 900);

     expect(text).toContain('Angular');
     expect(text).not.toContain('AngularJS');
  });

  it('should have a ranking smaller or equal than 60', async () => {

    browser.get('https://www.amazon.de/dp/3864906466/');
    const ranking = $('.zg_hrsr_rank');

    const text = await ranking.getText();
    const numberAsString = text.replace('Nr. ', '');
    const number = parseInt(numberAsString, 10);

    console.log('Die Nummer lautet:', number);
    expect(number).toBeLessThanOrEqual(60);
  });

  afterAll(() => browser.waitForAngularEnabled(true));

});
