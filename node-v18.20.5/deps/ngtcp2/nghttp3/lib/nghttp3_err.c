/*
 * nghttp3
 *
 * Copyright (c) 2019 nghttp3 contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
#include "nghttp3_err.h"

const char *nghttp3_strerror(int liberr) {
  switch (liberr) {
  case NGHTTP3_ERR_INVALID_ARGUMENT:
    return "ERR_INVALID_ARGUMENT";
  case NGHTTP3_ERR_INVALID_STATE:
    return "ERR_INVALID_STATE";
  case NGHTTP3_ERR_WOULDBLOCK:
    return "ERR_WOULDBLOCK";
  case NGHTTP3_ERR_STREAM_IN_USE:
    return "ERR_STREAM_IN_USE";
  case NGHTTP3_ERR_MALFORMED_HTTP_HEADER:
    return "ERR_MALFORMED_HTTP_HEADER";
  case NGHTTP3_ERR_REMOVE_HTTP_HEADER:
    return "ERR_REMOVE_HTTP_HEADER";
  case NGHTTP3_ERR_MALFORMED_HTTP_MESSAGING:
    return "ERR_MALFORMED_HTTP_MESSAGING";
  case NGHTTP3_ERR_QPACK_FATAL:
    return "ERR_QPACK_FATAL";
  case NGHTTP3_ERR_QPACK_HEADER_TOO_LARGE:
    return "ERR_QPACK_HEADER_TOO_LARGE";
  case NGHTTP3_ERR_STREAM_NOT_FOUND:
    return "ERR_STREAM_NOT_FOUND";
  case NGHTTP3_ERR_CONN_CLOSING:
    return "ERR_CONN_CLOSING";
  case NGHTTP3_ERR_STREAM_DATA_OVERFLOW:
    return "ERR_STREAM_DATA_OVERFLOW";
  case NGHTTP3_ERR_QPACK_DECOMPRESSION_FAILED:
    return "ERR_QPACK_DECOMPRESSION_FAILED";
  case NGHTTP3_ERR_QPACK_ENCODER_STREAM_ERROR:
    return "ERR_QPACK_ENCODER_STREAM_ERROR";
  case NGHTTP3_ERR_QPACK_DECODER_STREAM_ERROR:
    return "ERR_QPACK_DECODER_STREAM_ERROR";
  case NGHTTP3_ERR_H3_FRAME_UNEXPECTED:
    return "ERR_H3_FRAME_UNEXPECTED";
  case NGHTTP3_ERR_H3_FRAME_ERROR:
    return "ERR_H3_FRAME_ERROR";
  case NGHTTP3_ERR_H3_MISSING_SETTINGS:
    return "ERR_H3_MISSING_SETTINGS";
  case NGHTTP3_ERR_H3_INTERNAL_ERROR:
    return "ERR_H3_INTERNAL_ERROR";
  case NGHTTP3_ERR_H3_CLOSED_CRITICAL_STREAM:
    return "ERR_CLOSED_CRITICAL_STREAM";
  case NGHTTP3_ERR_H3_GENERAL_PROTOCOL_ERROR:
    return "ERR_H3_GENERAL_PROTOCOL_ERROR";
  case NGHTTP3_ERR_H3_ID_ERROR:
    return "ERR_H3_ID_ERROR";
  case NGHTTP3_ERR_H3_SETTINGS_ERROR:
    return "ERR_H3_SETTINGS_ERROR";
  case NGHTTP3_ERR_H3_STREAM_CREATION_ERROR:
    return "ERR_H3_STREAM_CREATION_ERROR";
  case NGHTTP3_ERR_NOMEM:
    return "ERR_NOMEM";
  case NGHTTP3_ERR_CALLBACK_FAILURE:
    return "ERR_CALLBACK_FAILURE";
  default:
    return "(unknown)";
  }
}

uint64_t nghttp3_err_infer_quic_app_error_code(int liberr) {
  switch (liberr) {
  case 0:
    return NGHTTP3_H3_NO_ERROR;
  case NGHTTP3_ERR_QPACK_DECOMPRESSION_FAILED:
    return NGHTTP3_QPACK_DECOMPRESSION_FAILED;
  case NGHTTP3_ERR_QPACK_ENCODER_STREAM_ERROR:
    return NGHTTP3_QPACK_ENCODER_STREAM_ERROR;
  case NGHTTP3_ERR_QPACK_DECODER_STREAM_ERROR:
    return NGHTTP3_QPACK_DECODER_STREAM_ERROR;
  case NGHTTP3_ERR_H3_FRAME_UNEXPECTED:
    return NGHTTP3_H3_FRAME_UNEXPECTED;
  case NGHTTP3_ERR_H3_FRAME_ERROR:
    return NGHTTP3_H3_FRAME_ERROR;
  case NGHTTP3_ERR_H3_MISSING_SETTINGS:
    return NGHTTP3_H3_MISSING_SETTINGS;
  case NGHTTP3_ERR_H3_INTERNAL_ERROR:
  case NGHTTP3_ERR_NOMEM:
  case NGHTTP3_ERR_CALLBACK_FAILURE:
  case NGHTTP3_ERR_QPACK_FATAL:
  case NGHTTP3_ERR_QPACK_HEADER_TOO_LARGE:
  case NGHTTP3_ERR_STREAM_DATA_OVERFLOW:
    return NGHTTP3_H3_INTERNAL_ERROR;
  case NGHTTP3_ERR_H3_CLOSED_CRITICAL_STREAM:
    return NGHTTP3_H3_CLOSED_CRITICAL_STREAM;
  case NGHTTP3_ERR_H3_GENERAL_PROTOCOL_ERROR:
    return NGHTTP3_H3_GENERAL_PROTOCOL_ERROR;
  case NGHTTP3_ERR_H3_ID_ERROR:
    return NGHTTP3_H3_ID_ERROR;
  case NGHTTP3_ERR_H3_SETTINGS_ERROR:
    return NGHTTP3_H3_SETTINGS_ERROR;
  case NGHTTP3_ERR_H3_STREAM_CREATION_ERROR:
    return NGHTTP3_H3_STREAM_CREATION_ERROR;
  case NGHTTP3_ERR_MALFORMED_HTTP_HEADER:
  case NGHTTP3_ERR_MALFORMED_HTTP_MESSAGING:
    return NGHTTP3_H3_MESSAGE_ERROR;
  default:
    return NGHTTP3_H3_GENERAL_PROTOCOL_ERROR;
  }
}

int nghttp3_err_is_fatal(int liberr) { return liberr < NGHTTP3_ERR_FATAL; }
