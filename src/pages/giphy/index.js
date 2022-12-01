import { useEffect, useState } from 'react';
import styles from './index.module.scss';

const BASE64_SECRET_API_KEY = 'R2M3MTMxamlKdXZJN0lkTjBIWjFEN25oMG93NUJVNmc=';

function GiphyPage() {
    const [image, setImage] = useState();
    const [query, setQuery] = useState('');

    async function fetchResponse(q) {
        setImage(null);

        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?type=gifs&limit=1&api_key=${atob(BASE64_SECRET_API_KEY)}&q=${q}`
        );

        return response.json();
    }

    async function handleQueryChange(newQueryValue) {
        if (newQueryValue) {
            const response = await fetchResponse(newQueryValue);
            setImage(response.data[0]);
        } else {
            setImage(undefined);
        }

        setQuery(newQueryValue);
    }

    useEffect(() => {
        const newQuery = window.location.search.replace('?q=', '');
        if (newQuery) {
            setQuery(newQuery);
            fetchResponse(newQuery).then((response) => {
                setImage(response.data[0]);
            });
        }
    }, []);

    return (
        <div className={styles.root}>
            <form className={styles.formWrapper}>
                <input name="q" onChange={(e) => handleQueryChange(e.target.value)} type="search" value={query} />
                <button onClick={() => handleQueryChange('')} type="button">
                    Clear
                </button>
            </form>
            <div className={styles.imageWrapper}>
                {image?.images?.downsized_large?.url && (
                    <img alt={image.title} src={image.images.downsized_large.url} />
                )}
            </div>
        </div>
    );
}

export default GiphyPage;
