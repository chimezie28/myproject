"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
// These can come from your .env file const SUPABASE_URL = process.env.SUPABASE_URL!;const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
