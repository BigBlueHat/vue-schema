# vue-schema in Apache CouchDB

```
couchapp push . http://{user}:{passw}@localhost:5984/{db}
open http://{user}:{passwd}@localhost:5984/{db}/_design/vue-schema/_rewrite/
```

Current schemas are loaded out of the same `schemas` directory (symlinked into
`_attachments`). There is a MapReduce View for storing them in the DB, but this
isn't hooked into the UI...yet.
