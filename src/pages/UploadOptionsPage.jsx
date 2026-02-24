import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OPTION_KEYS = {
  PHOTO: 'photo',
  VIDEO: 'video',
  SOUND: 'sound'
};

function UploadOptionsPage() {
  const [animal, setAnimal] = useState('');
  const [breed, setBreed] = useState('');
  const [selectedOption, setSelectedOption] = useState(OPTION_KEYS.PHOTO);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnimal = localStorage.getItem('selectedAnimal');
    const storedBreed = localStorage.getItem('selectedBreed');

    if (!storedAnimal) {
      navigate('/select-animal', { replace: true });
      return;
    }
    if (!storedBreed) {
      navigate('/select-breed', { replace: true });
      return;
    }

    setAnimal(storedAnimal);
    setBreed(storedBreed);
  }, [navigate]);

  const niceAnimalLabel = animal === 'dog' ? 'Dog' : 'Cat';

  return (
    <div className="page-shell">
      <div className="page-header">
        <span className="page-kicker">Step 5 &middot; Upload</span>
        <h1 className="page-title">Share a moment with your pet</h1>
        <p className="page-subtitle">
          Choose how you want to capture your pet&apos;s voice. This is a frontend‑only demo, so files stay on your
          device.
        </p>
      </div>

      <div className="page-content">
        {animal && breed && (
          <div className="summary-pill">
            Translating for <span>{niceAnimalLabel}</span> &middot; <span>{breed}</span>
          </div>
        )}

        <div className="card-grid card-grid--three">
          <button
            type="button"
            className={`choice-card choice-card--accent-dog ${
              selectedOption === OPTION_KEYS.PHOTO ? 'choice-card--active' : ''
            }`}
            onClick={() => setSelectedOption(OPTION_KEYS.PHOTO)}
          >
            <div className="badge">📷 Upload photo</div>
            <div className="choice-card__emoji" aria-hidden="true">
              📸
            </div>
            <div className="choice-card__title">Photo + expression</div>
            <div className="choice-card__subtitle">
              Let the AI read body language from a single still image of your pet.
            </div>
          </button>

          <button
            type="button"
            className={`choice-card ${
              selectedOption === OPTION_KEYS.VIDEO ? 'choice-card--active' : ''
            }`}
            onClick={() => setSelectedOption(OPTION_KEYS.VIDEO)}
          >
            <div className="badge">🎥 Upload video</div>
            <div className="choice-card__emoji" aria-hidden="true">
              🎬
            </div>
            <div className="choice-card__title">Full scene</div>
            <div className="choice-card__subtitle">
              Capture motion, tail wags, and context to get richer translations.
            </div>
          </button>

          <button
            type="button"
            className={`choice-card choice-card--accent-cat ${
              selectedOption === OPTION_KEYS.SOUND ? 'choice-card--active' : ''
            }`}
            onClick={() => setSelectedOption(OPTION_KEYS.SOUND)}
          >
            <div className="badge">🎤 Sound only</div>
            <div className="choice-card__emoji" aria-hidden="true">
              🔊
            </div>
            <div className="choice-card__title">Just the audio</div>
            <div className="choice-card__subtitle">
              Upload barks or meows only and let the model focus purely on sound.
            </div>
          </button>
        </div>

        <div className="file-input-wrapper">
          {selectedOption === OPTION_KEYS.PHOTO && (
            <>
              <div className="file-input-label">Photo file</div>
              <input type="file" accept="image/*" />
              <div className="file-input-helper">
                Choose a clear photo where your pet&apos;s face and general posture are visible.
              </div>
            </>
          )}

          {selectedOption === OPTION_KEYS.VIDEO && (
            <>
              <div className="file-input-label">Video file</div>
              <input type="file" accept="video/*" />
              <div className="file-input-helper">
                Short clips (5–20 seconds) work best. This is just a UI; files are not uploaded.
              </div>
            </>
          )}

          {selectedOption === OPTION_KEYS.SOUND && (
            <>
              <div className="file-input-label">Audio file</div>
              <input type="file" accept="audio/*" />
              <div className="file-input-helper">
                Upload a recording of barks, meows, or purrs. Imagine an AI model turning this into subtitles.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadOptionsPage;

