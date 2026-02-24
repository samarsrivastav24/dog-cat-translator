import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DOG_BREEDS = ['Labrador', 'German Shepherd', 'Golden Retriever', 'Pug', 'Husky'];
const CAT_BREEDS = ['Persian', 'Siamese', 'Maine Coon', 'Bengal', 'British Shorthair'];

function BreedSelectionPage() {
  const [animal, setAnimal] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnimal = localStorage.getItem('selectedAnimal');
    if (!storedAnimal) {
      navigate('/select-animal', { replace: true });
      return;
    }
    setAnimal(storedAnimal);
  }, [navigate]);

  function handleSelectBreed(breed) {
    localStorage.setItem('selectedBreed', breed);
    navigate('/upload');
  }

  const isDog = animal === 'dog';
  const breeds = isDog ? DOG_BREEDS : CAT_BREEDS;

  return (
    <div className="page-shell">
      <div className="page-header">
        <span className="page-kicker">Step 4 &middot; Choose breed</span>
        <h1 className="page-title">Narrow it down by breed</h1>
        <p className="page-subtitle">
          Different breeds express themselves in slightly different ways. Choose the closest match so our AI can
          fine‑tune translations.
        </p>
      </div>

      <div className="page-content">
        {animal && (
          <div className="summary-pill">
            Selected animal: <span>{isDog ? 'Dog' : 'Cat'}</span>
          </div>
        )}

        <div className="card-grid">
          {breeds.map((breed) => (
            <button
              key={breed}
              type="button"
              className="choice-card"
              onClick={() => handleSelectBreed(breed)}
            >
              <div className="choice-card__title">{breed}</div>
              <div className="choice-card__subtitle">
                Optimized presets for a typical {breed.toLowerCase()}&apos;s personality and voice.
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BreedSelectionPage;

