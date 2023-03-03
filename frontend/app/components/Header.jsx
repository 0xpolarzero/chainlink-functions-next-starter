import Image from "next/image"

const Header = () => {
  return (
    <header>
      <div className="title">
        <Image src="/functions.png" alt="Chainlink Functions Logo" width={80} height={45} priority />
        Chainlink Functions Next Starter
      </div>
      <div className="links">
        <a
          href="https://github.com/0xpolarzero/chainlink-functions-next-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image className="adapt" src="/github.svg" alt="Github Logo" width={20} height={20} />
        </a>
      </div>
    </header>
  )
}

export default Header
