exports.handler = async (event) => {


    try {


        const response = await fetch(
            "http://spro.prgfms.com/api/v3/DpoWiseStockDetails",
            {

                method: "POST",

                headers: {

                    "Accept-Encoding": "gzip",

                    "ApiKey": "f06ff43be3310989",

                    "App-Language": "en",

                    "Content-Type":
                    "application/x-www-form-urlencoded"

                },


                body:
                "emp_id=1457&country_id=42"

            }
        );



        const data = await response.json();



        return {

            statusCode: 200,

            headers: {

                "Access-Control-Allow-Origin": "*",

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify(data)

        };


    }
    catch(error){


        return {

            statusCode: 500,

            body:
            JSON.stringify({

                error:error.message

            })

        };


    }


};