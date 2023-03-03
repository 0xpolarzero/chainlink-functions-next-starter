const Instructions = () => {
  return (
    <div>
      <p>A starter kit for using Chainlink Functions in a frontend environment, using Next.js.</p>
      <p>
        All the code for this app (both frontend and contracts) is derived from{" "}
        <a
          href="https://github.com/smartcontractkit/functions-hardhat-starter-kit"
          target="_blank"
          rel="noopener noreferrer"
        >
          the Chainlink Functions repository
        </a>
        , but has been modified to work with Next.js, in a non-hardhat environment.{" "}
      </p>
      <p>
        <span className="bold">
          Everything is subject to my own interpretation, and is not guaranteed to be fully functional nor best
          optimized.
        </span>{" "}
        It should only be used <span className="bold">as a starting point</span> for quickly testing out Chainlink
        Functions in a frontend.
      </p>
    </div>
  )
}

export default Instructions
