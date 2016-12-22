[![Build Status](https://travis-ci.org/telemark/portalen-tasks.svg?branch=master)](https://travis-ci.org/telemark/portalen-tasks)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# portalen-tasks
All-in-one solution for tasks and portalen

## API
Exposes API. Auth header with jwt

### /user/{userId}
Returns tasks for given user

```bash
$ curl -v -H 'Authorization: your.very.long.jwt' http://localhost:8000/user/mememe 
```

## License
[MIT](LICENSE)