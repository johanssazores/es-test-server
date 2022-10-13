import { determineTransaction } from './utils'

const data = [
  {
    "transaction": "10d97eb0f5e95989b341032437962668",
    "transformations": [
        {
            "partNum": "SJ300520",
            "size": 3.9,
            "qty": 2
        },
        {
            "partNum": "SJ300520",
            "qty": -2,
            "size": 12
        },
        {
            "partNum": "SJ300520",
            "size": 8.1,
            "qty": 1
        },
        {
            "partNum": "SJ300520",
            "size": 7.2,
            "qty": 1
        }
    ]
},
{
    "transaction": "152cb08172d3cdc9ea9ce62af8383ea6",
    "transformations": [
        {
            "partNum": "EJB37191",
            "qty": 1,
            "size": 11.4
        },
        {
            "partNum": "EJB37191",
            "qty": 1,
            "size": 3.9
        },
        {
            "partNum": "EJB37191",
            "qty": 1,
            "size": 8.1
        },
        {
            "partNum": "EJB37191",
            "qty": -2,
            "size": 13
        }
    ]
}
]

const result = determineTransaction(data)
console.log(result)
