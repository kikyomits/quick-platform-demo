#!/bin/bash
oc -n demo start-build demo-backend
oc -n demo start-build demo-frontend
