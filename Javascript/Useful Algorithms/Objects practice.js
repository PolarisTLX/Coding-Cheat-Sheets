IMPORTANT NOTE LEARNED:
ALL KEYS in an OBJECT in javacript must be strings, or are turned into strings


from the Exercise "Life Expectancy" from Eloquent JavaScript chapter (Higher-Order Functions):

// for (j in history) {
//     console.log(j, typeof(j));
// }

this prints out:
16                 string
17                 string
18                 string
19                 string
20                 string
21                 string
length             string
scrollRestoration  string
state              string
go                 string
back               string
forward            string
pushState          string
replaceState       string

this shows that each key is a string.
ALSO that JS objects appear to have a bunch of things added to the end of them
