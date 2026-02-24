import { useNavigate } from 'react-router-dom';

function AnimalSelectionPage() {
  const navigate = useNavigate();

  function handleSelectAnimal(animal) {
    localStorage.setItem('selectedAnimal', animal);
    localStorage.removeItem('selectedBreed');
    navigate('/select-breed');
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <span className="page-kicker">Step 3 &middot; Choose animal</span>
        <h1 className="page-title">Who are we translating today?</h1>
        <p className="page-subtitle">
          Pick whether you want to translate barks or meows. You can always come back and switch later.
        </p>
      </div>

      <div className="page-content">
        <div className="card-grid">
          <button
            type="button"
            className="choice-card choice-card--accent-dog"
            onClick={() => handleSelectAnimal('dog')}
          >
            <div className="badge">🐶 Dog</div>
            <div className="choice-card__emoji" aria-hidden="true">
              🐕
            </div>
            <div className="choice-card__title">Dog translator</div>
            <div className="choice-card__subtitle">
              Decode tail wags, happy barks, and dramatic howls into simple human phrases.
            </div>
          </button>

          <button
            type="button"
            className="choice-card choice-card--accent-cat"
            onClick={() => handleSelectAnimal('cat')}
          >
            <div className="badge">🐱 Cat</div>
            <div className="choice-card__emoji" aria-hidden="true">
              🐈
            </div>
            <div className="choice-card__title">Cat translator</div>
            <div className="choice-card__subtitle">
              Turn gentle purrs and judgmental meows into surprisingly honest status updates.
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnimalSelectionPage;

