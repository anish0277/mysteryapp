import React from 'react';
import {
  Html,
  Head,
  Preview,
  Heading,
  Section,
  Text,
  Button,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your OTP code for verification</Preview>
      <Section style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <Heading style={{ color: '#333' }}>Hello, {username} </Heading>
        <Text style={{ fontSize: '16px', color: '#444' }}>
          Use the following OTP code to verify your email:
        </Text>
        <Text
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            backgroundColor: '#e0f7fa',
            padding: '10px',
            display: 'inline-block',
            borderRadius: '4px',
          }}
        >
          {otp}
        </Text>
        <Text style={{ fontSize: '14px', color: '#666', marginTop: '20px' }}>
          This code will expire in 1 hr. If you didn’t request this, you can safely ignore it.
        </Text>
      </Section>
    </Html>
  );
}
