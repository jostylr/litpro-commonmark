# Marking up a page

    <html>
        <head>
        </head>
        <body>
            _"body|md"

            _"math|md tex"

            _"math|md"
        </body>
    </html>

[out.html](# "save:")

    
# Body

    # Awesome

    This is going **rock**

        if (true) {
            return 1;
        }

   And now for some lists:

   1. One
   2. Three

## Math

    I love me some good **math**

    How about $\frac{3}{4} _23_ $?

    Or what about
    $$\frac{4}{3} _23_
    = \sin_3(x)$$

    Same: \(\frac{3}{4} _23_ \)

    Or 
    \[\frac{3}{4} _34_
    = \sin_3(x)\]

    And then some dollar signs by themselves $3, _34_
    $5
    $6

