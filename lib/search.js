import algoliasearch from 'algoliasearch/lite';

const searchStores = async (query, indexName) => {
    const algoliaClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
    );

    const index = algoliaClient.initIndex(indexName);

    const params = {
        hitsPerPage: 30,
        page: 0
    };


    const req = await index.search(query, params);
    return req.hits;


}

export default searchStores;