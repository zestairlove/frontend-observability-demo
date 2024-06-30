import 'source-map-support/register';
import winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';

export const getLogger = ({
  level = 'info',
  serverGroup,
  zone,
  levels = {}
}: {
  level?: 'info' | 'error' | 'warn' | 'debug';
  serverGroup: string;
  zone: string;
  levels?: winston.config.AbstractConfigSetLevels;
}) =>
  winston.createLogger({
    level: level,
    levels: Object.assign(winston.config.syslog.levels, levels),
    handleExceptions: true,
    exitOnError: false,
    format: winston.format.combine(
      winston.format((info, opts) => {
        info['labels.serverGroup'] = serverGroup;
        info['labels.zone'] = zone;
        return info;
      })(),
      ecsFormat()
    ),
    transports: [new winston.transports.Console()]
  });
