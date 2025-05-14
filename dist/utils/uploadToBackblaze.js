"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// utils/uploadToBackblaze.ts
const backblaze_b2_1 = __importDefault(require("backblaze-b2"));
const fs_1 = __importDefault(require("fs"));
const b2 = new backblaze_b2_1.default({
    applicationKeyId: process.env.B2_KEY_ID,
    applicationKey: process.env.B2_APP_KEY,
});
const BUCKET_ID = process.env.B2_BUCKET_ID;
const BUCKET_NAME = process.env.B2_BUCKET_NAME;
const uploadToBackblaze = (filePath, originalName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield b2.authorize();
        const fileData = fs_1.default.readFileSync(filePath);
        const uploadUrlResp = yield b2.getUploadUrl({ bucketId: BUCKET_ID });
        const uploadResp = yield b2.uploadFile({
            uploadUrl: uploadUrlResp.data.uploadUrl,
            uploadAuthToken: uploadUrlResp.data.authorizationToken,
            fileName: `${Date.now()}-${originalName}`,
            data: fileData,
        });
        return `https://f000.backblazeb2.com/file/${BUCKET_NAME}/${uploadResp.data.fileName}`;
    }
    catch (err) {
        const error = err;
        throw new Error(`Failed to upload file to Backblaze: ${error.message}`);
    }
});
exports.default = uploadToBackblaze;
