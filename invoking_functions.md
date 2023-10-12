<!-- Invoke function synchronously -->

aws lambda invoke --function-name tetherTestFunction --payload ewogICJrZXkxIjogInZhbHVlMSIsCiAgImtleTIiOiAidmFsdWUyIiwKICAia2V5MyI6ICJ2YWx1ZTMiCn0= response.json

aws lambda invoke --function-name tetherTestFunction out

<!-- Invoke function asynchronously -->

aws lambda invoke --function-name tetherTestFunction --invocation-type Event --payload BASE64-ENCODED-STRING response.json