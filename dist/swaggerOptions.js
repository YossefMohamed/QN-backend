"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Covid App Api",
            description: "Using Couph Sound To Detect Covid-19",
            version: "1.0.0",
            content: {
                name: "Covid App Api",
            },
            servers: ["http://localhost:8080/api/v1"],
        },
        paths: {
            "/api/v1/users/": {
                post: {
                    tags: ["Users"],
                    summary: "Register A New User",
                    parameters: [
                        {
                            in: "body",
                            name: "body",
                            description: "User That We Want To Register",
                            schema: {
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    lastName: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    number: {
                                        type: "string",
                                    },
                                    gender: {
                                        type: "string",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                    confirmPassword: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "ok",
                            schema: {
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    lastName: {
                                        type: "string",
                                    },
                                    _id: {
                                        type: "string",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    number: {
                                        type: "string",
                                    },
                                    verified: {
                                        type: "boolean",
                                    },
                                    isAdmin: {
                                        type: "boolean",
                                    },
                                    code: {
                                        type: "string",
                                    },
                                    gender: {
                                        type: "string",
                                    },
                                    token: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                        "400": {
                            discrition: "failed",
                            schema: {
                                properties: {
                                    message: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/v1/users/login": {
                post: {
                    tags: ["Users"],
                    summary: "login A New User",
                    parameters: [
                        {
                            in: "body",
                            name: "body",
                            description: "User That We Want To login",
                            schema: {
                                properties: {
                                    number: {
                                        type: "string",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "ok",
                            schema: {
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    _id: {
                                        type: "string",
                                    },
                                    lastName: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    number: {
                                        type: "string",
                                    },
                                    verified: {
                                        type: "boolean",
                                    },
                                    isAdmin: {
                                        type: "boolean",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                    code: {
                                        type: "string",
                                    },
                                    gender: {
                                        type: "string",
                                    },
                                    token: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                        "404": {
                            discrition: "failed",
                            schema: {
                                properties: {
                                    message: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/v1/users/message": {
                post: {
                    tags: ["Users"],
                    summary: "send a message with a code to a user",
                    parameters: [
                        {
                            in: "query",
                            name: "user",
                            description: "ID of the user",
                            schema: {
                                properties: {
                                    user: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "ok",
                            schema: {
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    _id: {
                                        type: "string",
                                    },
                                    lastName: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    number: {
                                        type: "string",
                                    },
                                    verified: {
                                        type: "boolean",
                                    },
                                    isAdmin: {
                                        type: "boolean",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                    code: {
                                        type: "string",
                                    },
                                    gender: {
                                        type: "string",
                                    },
                                    token: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                        "404": {
                            discrition: "failed",
                            schema: {
                                properties: {
                                    message: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/v1/users/verify": {
                post: {
                    tags: ["Users"],
                    summary: "verify a user with a code",
                    parameters: [
                        {
                            in: "query",
                            name: "user",
                            description: "ID of the user",
                            schema: {
                                properties: {
                                    user: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                        {
                            in: "body",
                            name: "body",
                            description: "code sent to user",
                            schema: {
                                properties: {
                                    code: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    ],
                    responses: {
                        "200": {
                            description: "ok",
                            schema: {
                                properties: {
                                    name: {
                                        type: "string",
                                    },
                                    _id: {
                                        type: "string",
                                    },
                                    lastName: {
                                        type: "string",
                                    },
                                    email: {
                                        type: "string",
                                    },
                                    number: {
                                        type: "string",
                                    },
                                    verified: {
                                        type: "boolean",
                                    },
                                    isAdmin: {
                                        type: "boolean",
                                    },
                                    password: {
                                        type: "string",
                                    },
                                    code: {
                                        type: "string",
                                    },
                                    gender: {
                                        type: "string",
                                    },
                                    token: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                        "404": {
                            discrition: "failed",
                            schema: {
                                properties: {
                                    message: {
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            //samples
            "/api/v1/samples/": {
                post: {
                    tags: ["Samples"],
                    summary: "Add A New Sample",
                    parameters: [
                        {
                            in: "formData",
                            name: "sample",
                            type: "file",
                            description: "Sample File To Be Uploaded",
                            required: true
                        }, {
                            in: "formData",
                            name: "heartProblem",
                            type: "boolean",
                            description: "heartProblem if exist",
                            required: true
                        }, {
                            in: "formData",
                            name: "breathProblem",
                            type: "boolean",
                            description: "breathProblem if exist",
                            required: true
                        }, {
                            in: "header",
                            name: "Authorization",
                            type: "string",
                            description: "Authorization Token : 'Bearer TOKEN'",
                        },
                    ],
                    responses: {
                        "201": {
                            description: "ok",
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        link: {
                                            type: "string",
                                        },
                                        user: {
                                            type: "string",
                                        },
                                        covid: {
                                            type: "string",
                                        },
                                        _id: {
                                            type: "string",
                                        },
                                    }
                                },
                            },
                        },
                        "404": {
                            discrition: "failed",
                            schema: {
                                properties: {
                                    message: {
                                        type: String,
                                    },
                                },
                            },
                        },
                    },
                },
                get: {
                    tags: ["Samples"],
                    summary: "Get All Samples",
                    parameters: [
                        {
                            in: "header",
                            name: "Authorization",
                            type: "string",
                            description: "Authorization Token : 'Bearer TOKEN'",
                        },
                    ],
                    responses: {
                        "200": {
                            description: "Found Samples",
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        link: {
                                            type: "string",
                                        },
                                        user: {
                                            type: "string",
                                        },
                                        covid: {
                                            type: "string",
                                        },
                                        _id: {
                                            type: "string",
                                        },
                                    }
                                }
                            }
                        }, "401": {
                            description: "User Not Authorized",
                        }, "404": {
                            description: "Sample Not Found",
                        },
                    }
                }
            },
            "/api/v1/samples/:id": {
                get: {
                    tags: ["Samples"],
                    summary: "Get A Sample",
                    parameters: [
                        {
                            in: "header",
                            name: "Authorization",
                            type: "string",
                            description: "Authorization Token : 'Bearer TOKEN'",
                        },
                        {
                            in: "path",
                            name: "id",
                            type: "string",
                            description: "Sample ID",
                        },
                    ],
                    responses: {
                        "200": {
                            description: "ok",
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        link: {
                                            type: "string",
                                        },
                                        user: {
                                            type: "string",
                                        },
                                        covid: {
                                            type: "string",
                                        },
                                        _id: {
                                            type: "string",
                                        },
                                    }
                                },
                            },
                        },
                        "404": {
                            discrition: "Sample Not Found",
                            schema: {
                                properties: {
                                    message: {
                                        type: "Sample Not Found",
                                    },
                                },
                            },
                        },
                        "401": {
                            discrition: "User Not Authorized",
                            schema: {
                                properties: {
                                    message: {
                                        type: "User Not Authorized",
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ["Samples"],
                    summary: "Delete A Sample",
                    parameters: [
                        {
                            in: "header",
                            name: "Authorization",
                            type: "string",
                            description: "Authorization Token : 'Bearer TOKEN'",
                        },
                        {
                            in: "path",
                            name: "id",
                            type: "string",
                            description: "Sample ID",
                        },
                    ],
                    responses: {
                        "202": {
                            description: "ok",
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        link: {
                                            type: "string",
                                        },
                                        user: {
                                            type: "string",
                                        },
                                        covid: {
                                            type: "string",
                                        },
                                        _id: {
                                            type: "string",
                                        },
                                    }
                                },
                            },
                        },
                        "404": {
                            discrition: "Sample Not Found",
                            schema: {
                                properties: {
                                    message: {
                                        type: "Sample Not Found",
                                    },
                                },
                            },
                        },
                        "401": {
                            discrition: "User Not Authorized",
                            schema: {
                                properties: {
                                    message: {
                                        type: "User Not Authorized",
                                    },
                                },
                            },
                        },
                    },
                }
            }
        },
        definitions: {
            User: {
                properties: {
                    name: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                    lastName: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    number: {
                        type: "string",
                    },
                    verified: {
                        type: "boolean",
                    },
                    isAdmin: {
                        type: "boolean",
                    },
                    code: {
                        type: "string",
                    },
                    gender: {
                        type: "string",
                    },
                    _id: {
                        type: "string",
                    },
                },
            },
            Sample: {
                properties: {
                    link: {
                        type: "string",
                    },
                    user: {
                        type: "string",
                    },
                    covid: {
                        type: "boolean",
                    },
                    _id: {
                        type: "string",
                    },
                }
            }
        },
    },
    apis: ["index.ts"],
};
exports.default = swaggerOptions;
