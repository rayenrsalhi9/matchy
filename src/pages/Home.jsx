import brainIcon from '/images/home/brain.png'

export default function Home({ setIsHome, setCategory, category }) {
  return (
    <section className="home-page">
        <h1>MatchyMatch</h1>
        <p>
            Test your brainpower! Flip the cards, find the pairs, and see how fast you can match them all. Are you ready to sharpen your memory?
        </p>

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          id='category'
          aria-label='select a category'
        >
          <option value="">Select a category</option>
          <option value="animals">Animals</option>
          <option value="fruits">Fruits</option>
          <option value="vehicules">Vehicules</option>
        </select>

        <button 
          disabled={!category} 
          onClick={() => setIsHome(false)}
        >
          Start game
        </button>

        <img src={brainIcon} alt="brain icon" />
    </section>
  )
}
