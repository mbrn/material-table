import { byString } from '../src/utils';

test('byString', () => {
  const phrases = {
    phrases: {
      hithere: 'Hi there!',
      howdy: 'Howdy Cowboy',
      hello: { evening: 'Good evening', morning: 'Good Morning' },
    },
  };
  const hello = { evening: 'Good evening', morning: 'Good Morning' };
  expect(byString(phrases, '.phrases.hello')).toEqual(hello);
});

// TODO : Change SetByString to not mutate props so it's possible to test with below:
// test('setByString', () => {
//     let original = { hello: { goodbyes: ['see you later'] } };
//     let result = {
//         hello: { greetings: { morning: 'Good Morning' }, goodbyes: ['see you later'] },
//     };
//     expect(setByString(original, '.hello.greetings.morning', 'Good Morning')).toEqual(result);
// });
