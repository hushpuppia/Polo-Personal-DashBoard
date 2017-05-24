import { ProjectpoloPage } from './app.po';

describe('projectpolo App', () => {
  let page: ProjectpoloPage;

  beforeEach(() => {
    page = new ProjectpoloPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
