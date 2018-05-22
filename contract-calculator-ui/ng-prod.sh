ng build --prod
rm ../src/main/resources/static/*.*
cp dist/contract-calculator-ui/*.* ../src/main/resources/static/
