<div align="center"><h2>Eleventy + Vercel + Express = 🔢 + 👍</h2>

[A quest](https://annoyscript.vercel.app/posts/Adding%20view%20count%20and%20like%20button%20to%2011ty/) to make static 11ty blog less static, by adding like button and view count, using vercel and express.

````mermaid
flowchart LR
    subgraph 11ty [11ty]
    C(postTitle) ---  D[Views.njs] & E[Likes.njs]
    end
    subgraph node [node]
    F([express])
    end
    subgraph Vercel [Vercel KV]
    subgraph Key [Key]
    G(postTitle)
    end
    subgraph Value [Value]
    H[likes] & I[views]
    end
    end
    Key --- Value
    F <-.-> Key

    D <-. API/JSON .-> F
    E <-. API/JSON .-> F
````

 </div>
