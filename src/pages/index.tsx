/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Option from "~/components/Option";
import { type Fact, facts, fictionalFacts } from "~/utils";

const Home: NextPage = () => {
  const [left, setLeft] = useState<Fact>(facts[0]!)
  const [right, setRight] = useState<Fact>(fictionalFacts[0]!)
  const [factSide, setFactSide] = useState<"left" | "right">("left")
  const [points, setPoints] = useState(0)

  const nextGame = () => {
    const prevFact = factSide === "left" ? left : right

    let nextFact = facts[Math.floor(Math.random() * facts.length)] as Fact
    while (prevFact.text === nextFact?.text) {
      nextFact = facts[Math.floor(Math.random() * facts.length)] as Fact
    }

    const prevFiction = factSide === "left" ? right : left
    let nextFiction = fictionalFacts[Math.floor(Math.random() * fictionalFacts.length)] as Fact
    while (prevFiction.text === nextFiction?.text) {
      nextFiction = fictionalFacts[Math.floor(Math.random() * fictionalFacts.length)] as Fact
    }

    if (Math.random() > 0.5) {
      setFactSide("left")
      setLeft(nextFact)
      setRight(nextFiction)
    } else {
      setFactSide("right")
      setRight(nextFact)
      setLeft(nextFiction)
    }
  }

  const handleSelectOption = (side: "left" | "right") => {
    if (side === factSide) {
      alert("wow you got it right")
      setPoints(prev => prev + 1)
    } else {
      alert("dumb ass")
      setPoints(0)
    }
    nextGame()
  }

  useEffect(() => {
    nextGame()
  }, [])

  return (
    <>
      <Head>
        <title>Reality Check</title>
        <meta name="description" content="Fact or fiction?" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>📚</text></svg>" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex w-[100%]">
          <Option fact={left} handleSelectOption={() => handleSelectOption("left")} />
          <Option fact={right} handleSelectOption={() => handleSelectOption("right")} />
        </div>
        <div className="absolute text-center top-0">
          <p className="text-4xl font-bold text-white bg-black bg-opacity-50 border-2 border-white rounded px-4 py-1">
            Fact or fiction? Pick the one you believe is a fact!
          </p>
          <p className="text-4xl font-bold text-white bg-black bg-opacity-50 border-2 border-white rounded px-4 py-1">
            Points: {points}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
