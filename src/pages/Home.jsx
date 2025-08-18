import brainIcon from '../images/home/brain.png'

export default function Home() {
  return (
    <section className="home-page">
        <h1>MatchyMatch</h1>
        <p>
            Test your brainpower! Flip the cards, find the pairs, and see how fast you can match them all. Are you ready to sharpen your memory?
        </p>
        <button>Start game</button>
        <img src={brainIcon} alt="brain icon" />
    </section>
  )
}
