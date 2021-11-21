import * as CryptoJS from "crypto-js";

//니꼬 쌤이 원하는 클래스 구조는 static, 나머지것들, constructor 구조 순으로 코드 작성
class Block {
  // static으로 메서드를 만들경우, Block(클래스)에서 바로 불러 사용 가능 / 일반 메서드는 생성자를 만든 뒤 사용할 수 있음

  // 현재 block의 해쉬를 만들어주는 메서드
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  };

  // block구조가 제대로 되어있는지 확인 해주는 메서드
  static validateStructure = (ablock: Block): boolean =>
    typeof ablock.index === "number" &&
    typeof ablock.hash === "string" &&
    typeof ablock.previousHash === "string" &&
    typeof ablock.timestamp === "number" &&
    typeof ablock.data === "string";

  // Block 클래스 타입지정
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  // 객체 만들 때 필요한 요소들
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

// 첫번째 block 생성
const genesisBlock: Block = new Block(0, "20202020", "", "Hello", 123456);

// blockchain 변수 지정
let blockchain: Block[] = [genesisBlock];
// blockchain.push("block"); // 에러 발생함 - 설정한 type과 일치하지 않기 때문에 에러 발생

// typescript를 사용하면 어떠한 형태인지 파악하기 쉬워서 훨씬 좋다.
// const getBlockchain = (): Block[] => blockchain;

// 제일 최근의 blcok
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

// block을 만든 시간
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

//새로운 block을 생성 후, 검증을 통해서 chain으로 연결해주는 함수
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = getLatestBlock().index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimeStamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};

// 해쉬 검증용 함수
const getHashforBlock = (ablock: Block): string =>
  Block.calculateBlockHash(
    ablock.index,
    ablock.previousHash,
    ablock.timestamp,
    ablock.data
  );

// block이 제대로 생성되었는지 확인하는 함수
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (candidateBlock.index !== previousBlock.index + 1) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

// 최종적으로 검증이 끝내고 createNewBlock으로 보내주는 함수
const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

// 새로운 block 생성
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};
