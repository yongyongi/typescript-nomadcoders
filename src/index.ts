interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "yongyong",
  age: 29,
  gender: "male",
};

const sayhello = (person: Human): string => {
  return `hello ${person.name}, you are ${person.age}, you are a ${person.gender}!!`;
};

console.log(sayhello(person));

export {};
