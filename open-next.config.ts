import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default {
  ...defineCloudflareConfig({}),
  buildOutputPath: process.env.OPEN_NEXT_BUILD_OUTPUT?.trim() || ".",
};
