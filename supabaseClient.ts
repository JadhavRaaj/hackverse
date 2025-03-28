// supabaseClient.js
import 'react-native-get-random-values';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfmeajrnwrgzqlollpzo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbWVhanJud3JnenFsb2xscHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzUwNTksImV4cCI6MjA1ODY1MTA1OX0.j5kanPTMfVOB_x9-4IWUn2RCW0EA30bXJ9eQ75Ln6fo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);