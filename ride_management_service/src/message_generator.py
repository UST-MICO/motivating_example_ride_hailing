from datetime import datetime, timezone
import uuid
import socket
from logging import info
from random import randint as randint
from json import load
from config import PROJECT_PATH


class MessageGenerator:
    """
    The MessageGenerator creates random according to the CloudEvent convention.
    """

    def __init__(self, source):
        """
        Initializes the default fields.
        :param source: str, representing the 'source' field, which is supposed to be defined by the user defined
        """

        self.default_fields = {
            'specversion': '0.2',
            'type': 'io.github.ust.mico.test_message',
            'source': source,
            'contenttype': 'application/json',
        }
        info('MessageGenerator was created')

    def get_random_message(self) -> dict:
        """
        Creates a CloudEvent message with the following properties:
        * id: a uuid for this message
        * data: dict with timestamp
        :return: dict, representing the CloudEvent message
        """
        msg = {
                'id': uuid.uuid4().hex,
                'time': datetime.now(timezone.utc).isoformat(),
                'source': socket.gethostname(),
                'data': {
                    'timestamp': datetime.now().timestamp(),
                    'customerRating': randint(7, 10),
                }}
        return {**msg, **self.default_fields}
