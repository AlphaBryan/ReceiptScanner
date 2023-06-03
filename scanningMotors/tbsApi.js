'use strict';
import { useEffect } from 'react';
import { Platform } from 'react-native';

// load your environment containing the secret API key
// import { config as dotenvConfig } from 'dotenv';
// dotenvConfig();

const API_KEY = '4J9eBGKASKJu698FdRAwYd25sNzCdMCmyMTIZi96JosWS8WhC4jUr4FycIj0t9FB';
// const fs = require("react-native-fs");

export async function callProcess(files, params) {
  let formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    formData.append("file", {
      uri: file,
      name: file.split('/').pop(),
      type: 'image/jpeg'
    });
  }

  for (const key in params) {
    formData.append(key, params[key]);
  }

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'apikey': API_KEY
    }
  };

  const response = await fetch('https://api.tabscanner.com/api/2/process', options);
  const result = await response.json();
  return result;
}

export async function callResult(token) {
  const options = {
    method: 'GET',
    headers: {
      'apikey': API_KEY
    }
  };

  const response = await fetch(`https://api.tabscanner.com/api/result/${token}`, options);
  const result = await response.json();
  return result;
}