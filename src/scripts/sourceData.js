'use strict';

const fs = require('fs');
const contentful = require('contentful');

const client = contentful.createClient({
    space: '1nvmqs9mwh5z', // Insert Contentful Space ID
    accessToken: 'EtR0HK-fr2_aogfPBCwiA_QqvU0dfst8aoTeltahlUQ' // Insert Contentful Content Delivery API access token
});

client.getEntries({
    'content_type': 'card',
})
.then(entries => {
    const dir = './data';
    const jsonData = entries.items;
    for (var i = 0; i < jsonData.length; i++) {
        console.log('Succesfully retrieved data entry: ' + entries.items[i].fields.title);
    }

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log('Not able to find data folder, therefore created this.');
    } else {
        console.log('data folder encountered, will therefore re-use this.');
    }

    fs.writeFile(dir + '/contentful.json', JSON.stringify(jsonData), function(err, result) {
        if (err) console.log('error', err);
        console.log('succesfully written data to file');
    });
});
