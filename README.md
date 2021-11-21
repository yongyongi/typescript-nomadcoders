# typescript

자바스크립트로만 개발을 하였을 때, 엄격한 규칙이 없고, 자유도가 높기 때문에 사용하기가 쉽다. 하지만, 프로젝트의 규모가 커지고, 협업을 하다보면 이 장점은 단점이 되어 작은 버그들을 만들어 낸다. 문자대신 숫자가 들어가도 실행이 되고, 필수로 들어가야하는 인자가 들어가지 않아도 실행되는 등의 원하지 않는 결과로 실행이 된다.

그래서 나온 것이 typescript이고, 사용하였을 경우에 예측 가능하고, 읽기 쉬운 코드로 만들 수 있다.

typescript는 자바스크립트 위에서 실행되고, typeScript로 작성하는 것은 모두 자바스크립트로 변한다.

나는 아직 프로젝트를 해보면서 typescript의 필요성을 느끼지 못하고 있었다. "typescript를 사용하면 추가되는 코드가 많은데 굳이 해야할까?" 라는 의문이 있었지만 그럼에도 불구하고 typescript를 사용하는 것이 훨씬 좋다라는 말을 듣고 공부를 해보게 되었다.

## typescript setting

1. npm i -g typescript
2. tsconfig.json 파일 생성 - typescript에서 어떤식으로 자바스크립트로 변환할지 옵션을 정해주기 위해서 생성한다.

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2015",
    "sourceMap": true
  },

  "include": ["index.ts"], // 컴파일 할 파일 설정
  "exclude": ["node_modules"] // 컴파일 하지 않을 파일 설정
}
```

3. index.ts파일을 만들어 코드를 작성한다.
4. tsc명령어를 입력하면 index.ts 파일을 컴파일하여 index.js,index.js.map파일을 만들어준다.

> package.json의 script에 `prestart` 명령어는 `npm start`를 하였을 때, 그 전에 먼저 실행되는 명령어이다. 그래서 밑에와 같이 설정을 해놓고 `npm start`를 한다면 `prestart`부분이 먼저 실행되고 `start` 부분이 실행된다.

```json
//...생략
"script":{
    "prestart":"tsc",
    "start":"node index.js"
}
//...생략
```

node는 typescript를 이해하지 못하기 때문에 tyepscript로 컴파일하여 자바스크립트 파일을 만들어 주고, 실행하는 구조로 만든다. 그래서 위와 같이 script를 지정해놓으면 `npm start`명령어 하나로 간편하게 컴파일 부터 실행까지 할 수 있게 된다.

## typescript 사용해보기(1)

```ts
//index.ts
const name = "yongyong";
const age = 29;
const gender = "male";

const sayhello = (name, age, gender) => {
  console.log(`hello ${name}, you are ${age}, you are a ${gender}`);
};

sayhello(name, age, gender);

export {}; // name에서 생기는 에러를 없애기 위해서 설정해준다.
```

위 코드는 자바스크립트와 차이가 없다. 하지만, `sayhello(name,age)` 이렇게 두 인자만 불러올 경우는 typescript에서 빨간줄로 에러를 띄우고, `npm start`를 하였을 경우 터미널 창에 상세하게 에러내용이 나오게 된다. 만약, 자바스크립트였다면, 아무런 문제 없이 실행되고 gender부분이 undefiend로 나오게 되었을 것이다. 이런 자잘한 에러를 없애기 위해서 typescript를 사용한다.

만약, gender 파라미터가 팔수적이 아니라 선택적이라면 "?"를 붙여서 실행이 되게할 수도 있다.

```js
const sayhello = (name, age, gender?) => {
  // code
};
```

"?"를 사용하여 name, age는 꼭 필요하지만, gender는 선택적이라는 것을 알수있게 되었다.

## typescript 사용해보기(2)

이번에는 인자에 type을 지정해주는 방법에 대해서 알아보자.

```ts
//index.ts
const name = "yongyong";
const age = 29;
const gender = "male";

const sayhello = (name: string, age: number, gender: string) => {
  console.log(`hello ${name}, you are ${age}, you are a ${gender}`);
};

sayhello(name, age, gender);

export {};
```

위의 경우는 쉬운 예제이기 때문에 name에는 당연히 string, age는 당연히 number라고 생각할 수 있지만, 많은 변수를 받다보면 어떤타입의 인수를 주어야하는지 잊는 경우도 생길 수 있다. 그래서 미리 타입을 지정해주고, 실행하기 전에 typescript로 컴파일 과정을 거쳐 에러를 잡을 수 있다.

`sayhello("yongyong","29","male")` 이렇게 호출하였을 경우, 29가 스트링형식으로 되어있기 때문에 에러가 발생한다.

이렇게 인자에 타입을 지정할 수 있고, 또 결과값에 대한 타입도 지정할 수 있다.

```ts
const sayhello = (name: string, age: number, gender: string): void => {
  console.log(`hello ${name}, you are ${age}, you are a ${gender}`);
};
```

결과값이 없이 console.log만 하였기 때문에 void로 지정을 하였지만, reture하는 값이 있다면 void 대신에 다른 타입으로 지정할 수 있다.

```ts
const sayhello = (name: string, age: number, gender: string): string => {
  return `hello ${name}, you are ${age}, you are a ${gender}`;
};
```

console.log대신 return을 한다면, string으로 출력되기 때문에 string으로 타입 설정을 해주면 된다.

## tsc-watch

typescript의 nodemon이라고 생각하면 된다. 서버에서 ts파일을 수정하면, dist에 있는 자바스크립트 파일도 수정이 되고, 바로 적용된다. 그래서 tsc-watch를 사용하면 좀 더 쉽게 개발할 수 있다.

`npm i -D tsc-watch`

```json
//package.json
//...생략
"script":{
    "prestart":"tsc",
    "start":"node index.js"
}
//...생략
```

기존의 script를 tsc-watch를 사용하여 한줄로 바꿀 수 있다.

```json
//package.json
//...생략
"scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\"",
}
//...생략
```

컴파일이 성공하면 dist에 있는 index.js를 실행하라는 명령어이다.

그 전에 src폴더 밑에 ts파일을 두고, dist폴더 밑에 자바스크립트 파일을 두는 구성으로 바꾸어 보겠다.

```json
//tsconfig.json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2015",
    "sourceMap": true,
    "outDir": "dist" // 컴파일 된 자바스크립트 파일 저장공간 설정
  },
  "include": ["src/**/*"], // src 하위 ts파일 컴파일
  "exclude": ["node_modules"]
}
```

ts파일을 모두 src밑에서 관리하고, 컴파일 된 자바스크립트 파일은 dist 폴더에 관리하면서 파일을 구분할 수 있게 된다.

이제 `npm start`를 하면 nodemon을 실행한 것 처럼 한번의 실행으로 끝나는 것이 아니라 수정된 부분을 발견하면 그 부분을 바로 반영하게 된다.

## 인터페이스

작성해야 할 타입들이 많을 경우 인터페이스를 사용하여 가독성을 높일 수 있다.

```js
//index.ts
const name = "yongyong";
const age = 29;
const gender = "male";

const sayhello = (name: string, age: number, gender: string): string => {
  return `hello ${name}, you are ${age}, you are a ${gender}!!`;
};

console.log(sayhello(name, age, gender));

export {};
```

위 코드를 인터페이스를 사용하여 밑에와 같이 바꿀 수 있다.

```ts
//index.ts
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
  return `hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
};

console.log(sayhello(person));

export {};
```

`person:Human`은 Human interface와 person이 같은 구조를 가지고 있는지 타입 검사를 해준다. interface는 자바스크립트에서는 작동하지 않기 때문에 index.js파일에서는 보이지 않는다.

아주 가끔 인터페이스를 자바스크립트에 넣고 싶을때는 클래스(class)를 사용하면 된다. interface대신에 class를 넣으면 된다.

```ts
//index.ts
class Human {
  public name: string;
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
```

이렇게 클래스를 사용하면 자바스크립트에도 class가 생긴다. public과 private는 자바스크립트 파일에서 보이지 않는다.

> 이 강의를 통해서 짧게나마 타입스크립트에 대해서 알 수 있었다. 확실히 타입을 지정해줌으로써 함수가 어떤 것을 리턴하는지 알 수 있기 때문에 예측이 가능했다. 또, 잘 사용하지 않는 클래스를 사용하면서, 다시 간단하게나마 클래스에 대해 공부할 수 있었다.
