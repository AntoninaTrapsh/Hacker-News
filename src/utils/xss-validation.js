const regex = /<?script>?|<?img>?/gm;

function xssValidateString(str) {
    return str.replaceAll(regex, "");
}

export default xssValidateString;
