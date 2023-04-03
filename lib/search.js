import algoliasearch from 'algoliasearch/lite';

const searchStores = async (query,indexName) => {
    const algoliaClient = algoliasearch(
        "5IWTXV0X6W",
        "08727a8f1a02670d8849c4b96d8c8314"
    );

    const index = algoliaClient.initIndex(indexName);

    const params = {
        hitsPerPage: 20,
        page: 0
    };


    const req = await index.search(query, params);
    console.log(req.hits);
    return req.hits;



}

export default searchStores;