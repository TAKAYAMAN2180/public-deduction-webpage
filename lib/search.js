import algoliasearch from 'algoliasearch/lite';

const searchStores = async (query,indexName) => {
    const algoliaClient = algoliasearch(
        process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        process.env.NEXT_PUBLIC_FIREBASE_APP_KEY
    );

    const index = algoliaClient.initIndex(indexName);

    const params = {
        hitsPerPage: 20,
        page: 0
    };


    const req = await index.search(query, params);
    return req.hits;



}

export default searchStores;