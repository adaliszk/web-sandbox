# Qwik White-Label Domain Resolution

This is a prototype creates an example on how to resolve a white-label domain 
with Qwik-City. The idea is to serve customized content for multiple domains
using a single Qwik-City application.

The way this normally works is that you have an application served from a CDN
that is pulled in for multiple domain names, or you host the application in one
central domain name and CNAME embed the other domains into the central one.

Either way, what is needed is to retrieve the domain information and serve a
customized content for each domain. This customization usually only involves
styling and conditional content blocks, not entire different layouts.

## Solution

The domain can be resolved from the request headers, and thus the simplest
solution is to use that to import the custom styles and determine layout blocks
based on that, however, white-label solutions expect the domain to be available
as a path segment, except for the root domain.

In other frameworks, like Next.js, they use a workaround solution where they
"redirect" the request to a different folder. While redirections can be done,
with Qwik-City, it will not hide the redirected route.

The alternative to mimic the exact behaviour of Next.js is to simply fetch
the path and forward the response to the client. While this is not the best
solution as it will involve an HTTP request it does mimic the exact behaviour
of Next.js.

We currently lack on the API to change the baseDir of a Qwik-City routes on the
fly, so we have to use a workaround solution for now.