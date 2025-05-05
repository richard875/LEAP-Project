import { z } from "zod";

import { baseChatFields } from "./chatSchemaBase";

const ModifyChatSchema = z.object(baseChatFields);

export default ModifyChatSchema;
