import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    // static으로 메서드를 만들경우, Block에서 바로 불러 사용 가능 / 일반 메서드는 생성자를 만든 뒤 사용할 수 있음
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  };

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

const genesisBlock: Block = new Block(0, "20202020", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];
// blockchain.push("block"); // 에러 발생함 - 설정한 type과 일치하지 않기 때문에 에러 발생

// typescript를 사용하면 어떠한 형태인지 파악하기 쉬워서 훨씬 좋다.
const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

//새로운 block을 만들기
const createNewBlock = (data: string): Block => {
  const newIndex: number = getLatestBlock().index + 1;
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    getLatestBlock().hash,
    getNewTimeStamp(),
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    getLatestBlock().hash,
    data,
    getNewTimeStamp()
  );

  return newBlock;
};

console.log(createNewBlock("hello"));

export {};
