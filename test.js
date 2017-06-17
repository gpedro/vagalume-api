import Vagalume from './index.js';

const vagalume = new Vagalume();
const vagalumeWithKey = new Vagalume('660a4395f992ff67786584e238f501aa');

describe('vagalume-api', () => {

  test('artist - retrieve artist overwriting apikey', async () => {
    expect.assertions(1);
    const response = await vagalumeWithKey.artist('u2', {
      apikey: '660a4395f992ff67786584e238f501aa'
    });
    expect(response.artist.id).toBeDefined();
  });

  test('artist - retrieve artist using apiKey', async () => {
    expect.assertions(1);
    const response = await vagalumeWithKey.artist('u2');
    expect(response.artist.id).toBeDefined();
  });

  test('lyrics - search by musid and art', async () => {
    expect.assertions(2);
    const musid = '3ade68b6g8e27fda3';
    const response = await vagalume.lyrics({
      musid: musid,
      art: 'U2'
    });

    expect(response.mus.length).toBe(1);
    const mus = response.mus[0];
    expect(mus.id).toBe(musid);
  });

  test('lyrics - search by musid', async () => {
    expect.assertions(2);
    const musid = '3ade68b6g8e27fda3';
    const response = await vagalume.lyrics({
      musid: musid
    });

    expect(response.mus.length).toBe(1);
    const mus = response.mus[0];
    expect(mus.id).toBe(musid);
  });

  test('lyrics - search without lyrics', async () => {
    expect.assertions(2);
    const musid = '3ade68b6g8e27fda3';
    const response = await vagalume.lyrics({
      musid: musid,
      nolyrics: true,
    });

    expect(response.mus.length).toBe(1);
    const mus = response.mus[0];
    expect(response.mus.text).not.toBeDefined();
  });

  test('lyrics - search with extras', async () => {
    expect.assertions(5);
    const musid = '3ade68b6g8e27fda3';
    const response = await vagalume.lyrics({
      musid: musid,
      extra: ['relart', 'relmus', 'alb']
    });

    expect(response.mus.length).toBe(1);
    const mus = response.mus[0];

    // related music
    expect(mus.related).toBeDefined();

    // alb
    expect(mus.alb).toBeDefined();

    // related art
    expect(response.art).toBeDefined();
    expect(response.art.related).toBeDefined();
  });

  test('search - artist', async () => {
    expect.assertions(1);
    const response = await vagalume.search('art', 'U2');
    expect(response.response.docs.length).toBe(1);
  });

  test('search - excerpt', async () => {
    expect.assertions(1);
    const response = await vagalume.search('excerpt', 'and bodies strewn across a dead end street', 10);
    expect(response.response.docs.length).toBe(10);
  });

  test('search - artmus', async () => {
    expect.assertions(1);
    const response = await vagalume.search('artmus', 'U2 and bodies strewn across a dead end street', 4);
    expect(response.response.docs.length).toBe(4 * 2);
  });

  test('search - alb', async () => {
    expect.assertions(1);
    const response = await vagalume.search('alb', 'U2 singles', 4);
    expect(response.response.docs.length).toBe(4);
  });

  test('discography - retrieve discography', async () => {
    expect.assertions(1);
    const response = await vagalume.discography('u2');
    expect(response.discography.item.length).toBe(18);
  });

  test('hotspot - retrieve hotspot', async () => {
    expect.assertions(1);
    const response = await vagalume.hotspots();
    expect(response.hotspots.length).toBe(10);
  });

  test('news - retrieve news', async () => {
    expect.assertions(1);
    const response = await vagalume.news();
    expect(response.news.length).toBe(20);
  });

  test('artistImage - retrieve artistImage', async () => {
    expect.assertions(1);
    const response = await vagalume.artistImage('3ade68b3gdb86eda3', 5);
    expect(response.images.length).toBe(5);
  });

});