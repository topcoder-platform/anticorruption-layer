## Topcoder Domain - Resource

gRPC service for topcoder anti-corruption layer. This service keeps the writes to the legacy database to keep the legacy system happy and available for all legacy systems that interact with it.

Note that this is still in the initial stages of development and a lot of things might change rapidly. ACL, non-related domains like Challenge, Payment are embedded in this service and will likely be moved to their own services in the future.
