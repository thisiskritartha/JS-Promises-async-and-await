const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I coundnot write the file. 😥');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Cound write the file. 😥');
      resolve('success.');
    });
  });
};

const getDogImg = async () => {
  try {
    const data = await readFilePromise('./dog.txt');
    console.log(`Breed: ${data}`);

    const result1Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const result2Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const result3Promise = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([result1Promise, result2Promise, result3Promise]);
    const imgs = all.map((img) => img.body.message).join('\n');

    console.log(imgs);

    writeFilePromise('dog-img.txt', imgs);
    console.log('Dog image file saved success.');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: Ready.';
};

(async () => {
  try {
    console.log('1: Getting the dog img.');
    console.log(await getDogImg());
    console.log('3: Getting the dog img done !');
  } catch (err) {
    console.log('ERROR !');
  }
})();

/*
console.log('1: Getting the dog img.');
getDogImg()
  .then((x) => {
    console.log(x);
    console.log('2. Getting the dog img done !');
  })
  .catch((err) => {
    console.log('ERROR !');
  });
  */

/*
readFilePromise('./dog.txt')
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((result) => {
    console.log(result.body.message);
    return writeFilePromise('dog-img.txt', result.body.message);
  })
  .then(() => {
    console.log('Dog image file saved success.');
  })
  .catch((err) => {
    console.log(err);
  });
*/
