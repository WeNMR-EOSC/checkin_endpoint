var settings = {
    title: 'Endpoint Title',
    authority: 'https://aai.egi.eu/oidc',
    client_id: 'endpoint-id',
    popup_redirect_uri: 'sso/popup.html',
    post_logout_redirect_uri: 'sso/index.html',
    response_type: 'code token id_token',
    scope: 'openid email profile',
    debug: false,
    filterProtocolClaims: false
};
