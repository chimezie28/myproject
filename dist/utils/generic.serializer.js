"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericSerializer = void 0;
const GenericSerializer = (data, allowedFields) => {
    const serializedData = {};
    allowedFields.forEach((field) => {
        if (data[field] !== undefined) {
            serializedData[field] = data[field];
        }
    });
    return serializedData;
};
exports.GenericSerializer = GenericSerializer;
